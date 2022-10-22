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