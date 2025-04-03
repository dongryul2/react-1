export default function Mybutton() {
    function handeClick() {
        alert('You Clicked me!')
    }

    return (
        <button onClick={handeClick}>
            I'm a button
        </button>
    )

}