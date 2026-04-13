import { Enum } from "cc"

const _ = [ "linear", "smooth" , "fade" , "constant" , "quadIn" , "quadOut" , "quadInOut" , "quadOutIn" , "cubicIn" , "cubicOut" , "cubicInOut" , "cubicOutIn" , "quartIn" , "quartOut" , "quartInOut" , "quartOutIn" , "quintIn" , "quintOut" , "quintInOut" , "quintOutIn" , "sineIn" , "sineOut" , "sineInOut" , "sineOutIn" , "expoIn" , "expoOut" , "expoInOut" , "expoOutIn" , "circIn" , "circOut" , "circInOut" , "circOutIn" , "elasticIn" , "elasticOut" , "elasticInOut" , "elasticOutIn" , "backIn" , "backOut" , "backInOut" , "backOutIn" , "bounceIn" , "bounceOut" , "bounceInOut", "bounceOutIn" ] as const
export default Enum(_.reduce((_v, _c) => (_v[_c] = _c, _v), {}))
