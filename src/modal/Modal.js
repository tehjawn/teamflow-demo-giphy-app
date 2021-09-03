export const Modal = ({ imageData, onDismiss }) => {
    return (
        <div>
            <pre>
                <img src={imageData?.images?.original?.url} />
            </pre>
            <button onClick={onDismiss}>Dismiss</button>
        </div>
    )
}