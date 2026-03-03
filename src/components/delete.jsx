function deleteData({onDelete}) {
    return (
        <div>
            {/* <button onClick={onDelete}>Delete</button> */}
            <input type="radio" onClick={onDelete} />
        </div>
    )
}

export default deleteData