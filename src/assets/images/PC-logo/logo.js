import style from './logo.module.css'
import logo from './logo.svg'

const LogoRotate = () => {
  return (
    <img src={logo} className={style.logo} />
  )
}

export default LogoRotate