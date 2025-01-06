export function FormAddFrind({ onAdd }) {
  const [fNAme, setName] = useState("");
  const [imgSrc, setImg] = useState("https://i.pravatar.cc/48");

  function handleName({ target }) {
    setName(target.value);
  }

  function handleImg({ target }) {
    setImg(target.value);
  }

  // add new frind
  function handleSubmit(e) {
    e.preventDefault();
    if (!fNAme && !imgSrc) return;
    const id = new Date().getTime();

    const newFrind = {
      id,
      name: fNAme,
      image: `${imgSrc}?=${id}`,
      balance: 0,
    };

    onAdd(newFrind);
    // clear
    setImg("https://i.pravatar.cc/48");
    setName("");

    // close add form
  }

  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label htmlFor='frind-name'>👬 Name</label>
      <input value={fNAme} onChange={handleName} type='text' id='frind-name' />

      <label htmlFor='img'>🐱‍👤 Image </label>
      <input value={imgSrc} onChange={handleImg} type='text' />

      <Button>Add</Button>
    </form>
  );
}
