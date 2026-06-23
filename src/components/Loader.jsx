import { useEffect } from 'react'
import logo from '../../assets/logo.png'

export default function Loader({ visible }) {
  return (
    <div className={`loader${visible ? '' : ' hidden'}`}>
      <div className="loader-logo">
        <img src={logo} alt="Mysa" />
      </div>
    </div>
  )
}
