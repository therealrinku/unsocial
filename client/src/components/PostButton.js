import { IoAdd } from "react-icons/all";

const NewPostBtn = ({ setSelectedImage, toggleAddPostModal }) => {
  const updateFile = (e) => {
    const file = e.target.files[0];

    if (file) {
      if (
        file.name
          .slice(file.name.slice(file.name.lastIndexOf(".")))
          .includes("jpg", "png", "jpeg")
      ) {
        toggleAddPostModal();
        setSelectedImage(file);
      } else {
        alert("Image must be on jpg,png or jpeg format.");
      }
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
            accept="image/*"
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
