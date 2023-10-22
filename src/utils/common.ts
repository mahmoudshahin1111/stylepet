export function hexToRgb(hex: string):{r:number,g:number,b:number,a?} {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex)
 
  const returns = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  }
  if (result[4]) {
    returns.a = parseInt(result[4], 16)
  }else{
    returns.a = 255
  }
  console.log(returns)
  return returns || null;
}

export function div(a: number, b: number): number {
  if (b === 0) return 0
  return a / b
}
