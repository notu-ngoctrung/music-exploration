import { Badge } from '@mui/material';
import THEME from '../../color-scheme';

function Header() {
  return (
      <p style={{
        fontSize: '2em',
        fontWeight: 600,
        marginTop: '1.5em',
        marginBottom: '1em',
        textAlign: 'center'
      }}>
        <Badge color="primary" style={{  transform: 'translate(2em, -0.95em)'}}
          badgeContent={<p style={{
            fontWeight: 600,
            marginBottom: '1em',
            textAlign: 'center',
            fontFamily: 'JetBrains Mono'
          }}><label style={{ color: THEME.secondaryDarker }}>MUSIC&nbsp;</label>EXPLORATION</p>}
        ></Badge>
        <label style={{ color: THEME.secondaryDarker }}>&gt; trend&nbsp;</label>analysis&nbsp;
      </p>
  );
}

export default Header;