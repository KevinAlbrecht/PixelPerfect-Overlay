use tauri::Manager;

#[path = "utils.rs"]
mod utils;

#[tauri::command]
pub async fn read_file(path: String) -> String {
    match std::fs::read(path) {
        Ok(bytes) => utils::get_b64_from_uint8(bytes),
        Err(e) => {
            println!("read_file failed {e}");
            panic!("read_file failed{}", e)
        }
    }
}

#[tauri::command]
pub async fn open_overlay(handle: tauri::AppHandle) {
    utils::create_window(handle)
}

#[tauri::command]
pub async fn resize_overlay(width: f32, height: f32, handle: tauri::AppHandle) {
    let window = handle.get_window(utils::OVERLAY_LABEL).unwrap();

    let new_width: f64 = if width < 400.0 {
        430.0
    } else {
        (width + 30.0) as f64
    };
    let new_height: f64 = if height < 100.0 {
        130.0
    } else {
        (height + 30.0) as f64
    };

    utils::resize_window(window, new_width, new_height)
}
