mod memory;

use neon::prelude::*;

use crate::memory::sys_memory;

fn hello(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("hello node"))
}

#[neon::main]
fn main(mut cx: ModuleContext) -> NeonResult<()> {
    cx.export_function("hello", hello)?;
    cx.export_function("memory", sys_memory)?;
    Ok(())
}
