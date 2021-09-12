mod utils;

#[cfg(test)]
#[path = "lib_test.rs"]
mod lib_test;

use itertools_num::linspace;
use num::complex::Complex64;
use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

// how many iterations does it take to escape?
fn get_escape_iterations(
    x: f64,
    y: f64,
    max_iterations: u32,
    escape_radius: f64,
    exponent: u32,
) -> (u32, Complex64) {
    let c: Complex64 = Complex64::new(x, y);
    let mut z: Complex64 = c;

    let mut iter: u32 = 0;

    while z.norm() < escape_radius && iter < max_iterations {
        iter += 1;
        z = z.powu(exponent) + c;
    }

    (iter, z)
}

// Mandelbrot set is simply connected.
// So if the border of the rectangle is in the set, we know the rest of it is too.
fn rect_in_set(
    re_range: itertools_num::Linspace<f64>,
    im_range: itertools_num::Linspace<f64>,
    max_iterations: u32,
    escape_radius: f64,
    exponent: u32,
) -> bool {
    // horizontal
    let top = im_range.clone().next().unwrap();
    let bottom = im_range.clone().last().unwrap();
    for re in re_range.clone() {
        let top_in_set = get_escape_iterations(re, top, max_iterations, escape_radius, exponent).0
            == max_iterations;
        let bottom_in_set =
            get_escape_iterations(re, bottom, max_iterations, escape_radius, exponent).0
                == max_iterations;
        if !top_in_set || !bottom_in_set {
            return false;
        }
    }

    // vertical
    let left = re_range.clone().next().unwrap();
    let right = re_range.last().unwrap();
    for im in im_range.clone() {
        let left_in_set =
            get_escape_iterations(left, im, max_iterations, escape_radius, exponent).0
                == max_iterations;
        let right_in_set =
            get_escape_iterations(right, im, max_iterations, escape_radius, exponent).0
                == max_iterations;
        if !left_in_set || !right_in_set {
            return false;
        }
    }

    true
}

// map leaflet coordinates to complex plane
fn map_coordinates(x: f64, y: f64, z: f64, tile_size: usize) -> (f64, f64) {
    let scale_factor = tile_size as f64 / 128.5;
    let d: f64 = 2.0f64.powf(z - 2.0);
    let re = x / d * scale_factor - 4.0;
    let im = y / d * scale_factor - 4.0;

    (re, im)
}

const NUM_COLOR_CHANNELS: usize = 4;

#[wasm_bindgen]
pub fn get_tile(
    center_x: f64,
    center_y: f64,
    z: f64,
    max_iterations: u32,
    exponent: u32,
    image_side_length: usize,
) -> Vec<u8> {
    let min_channel_value = 0;
    let max_channel_value = 255;
    let palette = colorous::TURBO;
    let output_size: usize = image_side_length * image_side_length * NUM_COLOR_CHANNELS;

    // Canvas API expects UInt8ClampedArray
    let mut img: Vec<u8> = vec![0; output_size]; // [ r, g, b, a, r, g, b, a, r, g, b, a... ]

    let (re_min, im_min) = map_coordinates(center_x, center_y, z, image_side_length);
    let (re_max, im_max) = map_coordinates(center_x + 1.0, center_y + 1.0, z, image_side_length);

    let re_range = linspace(re_min, re_max, image_side_length);
    let im_range = linspace(im_min, im_max, image_side_length);
    let enumerated_re_range = re_range.clone().enumerate();
    let enumerated_im_range = im_range.clone().enumerate();

    let palette_scale_factor = 20.0;
    let scaled_max_iterations = (max_iterations * palette_scale_factor as u32) as usize;
    let rgb_black = [min_channel_value; 3];
    let rgba_black = [min_channel_value, min_channel_value, min_channel_value, max_channel_value];

    // radius has to be >=3 for color smoothing
    let escape_radius = 3.0;

    if rect_in_set(
        re_range,
        im_range,
        max_iterations,
        escape_radius,
        exponent,
    ) {
        return rgba_black
            .iter()
            .cycle() // repeat black pixel
            .take(output_size)
            .cloned()
            .collect(); // output expected image size
    }

    for (x, im) in enumerated_im_range {
        for (y, re) in enumerated_re_range.clone() {
            let (escape_iterations, z) =
                get_escape_iterations(re, im, max_iterations, escape_radius, exponent);

            let pixel: [u8; 3] = if escape_iterations == max_iterations {
                rgb_black
            } else {
                // See: https://www.iquilezles.org/www/articles/mset_smooth/mset_smooth.htm
                let smoothed_value = f64::from(escape_iterations)
                    - ((z.norm().ln() / escape_radius.ln()).ln() / f64::from(exponent).ln());
                // more colors to reduce banding
                let scaled_value = (smoothed_value * palette_scale_factor) as usize;
                let color = palette.eval_rational(scaled_value, scaled_max_iterations);

                color.as_array()
            };

            // index = ((current row * row length) + current column) * 4 to fit r,g,b,a values
            let index = (x * image_side_length + y) * NUM_COLOR_CHANNELS;
            img[index] = pixel[0]; // r
            img[index + 1] = pixel[1]; // g
            img[index + 2] = pixel[2]; // b
            img[index + 3] = max_channel_value; // a
        }
    }

    img
}

#[wasm_bindgen]
pub fn init() {
    utils::init();
}
