import SvgIcon from '@material-ui/core/SvgIcon';

function BasicPin(props) {
   return (
        <SvgIcon {...props} >
            <path fill="currentColor" d="M16,12V4H17V2H7V4H8V12L6,14V16H11.2V22H12.8V16H18V14L16,12Z" />
        </SvgIcon>
    );
}

export default BasicPin;