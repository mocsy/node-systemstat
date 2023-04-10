use neon::prelude::*;
use systemstat::{System, Platform, saturating_sub_bytes};

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    cx.export_function("memory", sys_memory)?;
    Ok(())
}

fn sys_memory(mut cx: FunctionContext) -> JsResult<JsString> {
    let sys = System::new();
    let res = match sys.memory() {
        Ok(mem) => format!("Memory: {} used / {} ({} bytes) total ({:?})", saturating_sub_bytes(mem.total, mem.free), mem.total, mem.total.as_u64(), mem.platform_memory),
        Err(x) => format!("Memory: error: {}", x)
    };
    Ok(cx.string(res))
}
