import './index.css';
import THEME from '../../color-scheme';

function HeaderLogo() {
  return (
    <p style={{
      fontSize: '3.5rem',
      fontWeight: 600,
      marginTop: '3.5rem',
      marginBottom: '3rem'
    }}>
      <label style={{ color: THEME.secondaryDarker }}>MUSIC</label> EXPLORATION v2.0
    </p>
  )
}

export default HeaderLogo;