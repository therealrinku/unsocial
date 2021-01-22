import { IoAdd } from "react-icons/all";

const NewPostBtn = ({ setSelectedImage, toggleAddPostModal }) => {
  const updateFile = (e) => {
    if (e.target.files[0]) {
      toggleAddPostModal();
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <div className="post--button">
      <button>
        <form>
          <input
            type="file"
            id="file_input"
            onChange={updateFile}
            name="post"
          />
          <label htmlFor="file_input">
            <IoAdd />
          </label>
        </form>
      </button>
    </div>
  );
};

export default NewPostBtn;
