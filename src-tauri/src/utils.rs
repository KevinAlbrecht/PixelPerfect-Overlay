use base64;
use std::str;
use tauri::{Error, LogicalSize, Manager, PhysicalPosition, Position, Size, Window};

pub enum MovingDirection {
    Left,
    Top,
    Right,
    Bottom,
}

#[derive(serde::Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MoveWindowPayload {
    evt_id: i32,
}

impl MovingDirection {
    fn from_int(val: i32) -> MovingDirection {
        match val {
            0 => MovingDirection::Left,
            1 => MovingDirection::Top,
            2 => MovingDirection::Right,
            3 => MovingDirection::Bottom,
            _ => panic!("Wrong Direction when moving window: {}", val),
        }
    }
}

pub const OVERLAY_LABEL: &str = "overlay";
pub const MOVING_STEP: i32 = 1;

pub fn get_b64_from_vector(buffer: Vec<u8>) -> String {
    return base64::encode(buffer);
}

pub fn create_window(handle: tauri::AppHandle) {
    let window = tauri::WindowBuilder::new(
        &handle,
        OVERLAY_LABEL,
        tauri::WindowUrl::App("overlay.html".into()),
    )
    .transparent(true)
    .decorations(false)
    .resizable(false)
    // Workaround: when the window appears, even if the bg should be transparent, it s not.
    // a white print is visible but disappears when resizing, so resizing at init remove this white print.
    // Memo: 0 sized window works on windows but no macos , 10.0 seems good enough
    .inner_size(10.0, 10.0)
    .build()
    .unwrap();
    let window_copy = window.clone();

    window.listen("MoveWindow", move |event| {
        let move_window_payload: MoveWindowPayload =
            serde_json::from_str(event.payload().unwrap()).unwrap();
        move_window(
            &window_copy,
            MovingDirection::from_int(move_window_payload.evt_id),
        )
        .unwrap();
    });
}

pub fn move_window(window: &Window, direction: MovingDirection) -> Result<(), Error> {
    let current_position = window.inner_position().unwrap();

    let physicalp = match direction {
        MovingDirection::Left => PhysicalPosition {
            x: current_position.x - MOVING_STEP,
            y: current_position.y,
        },
        MovingDirection::Top => PhysicalPosition {
            x: current_position.x,
            y: current_position.y - MOVING_STEP,
        },
        MovingDirection::Right => PhysicalPosition {
            x: current_position.x + MOVING_STEP,
            y: current_position.y,
        },
        MovingDirection::Bottom => PhysicalPosition {
            x: current_position.x,
            y: current_position.y + MOVING_STEP,
        },
    };

    window.set_position(Position::Physical(physicalp))
}

pub fn resize_window(handle: tauri::AppHandle, width: f64, height: f64) {
    let window = handle.get_window(&OVERLAY_LABEL).unwrap();
    window
        .set_size(Size::Logical(LogicalSize { width, height }))
        .unwrap();
}
