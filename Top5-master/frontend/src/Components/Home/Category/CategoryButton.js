import Button from '@material-ui/core/Button';

export default function CategoryButton(props) {


    const onClickEvent = () => {
        // console.log(props.curIndex)
        props.handleButton(props.value , props.curIndex);
        
    }
    return (
        <>

            <Button  onClick={() => { onClickEvent() }} type="submit" className={props.colorIndex ? "my-2 change__back button__swith" : "my-2 button__swith"} style={{ width: "200px" }} >
                {props.value}
            </Button>

        </>
    )
}