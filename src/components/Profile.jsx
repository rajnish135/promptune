import PromptCard from "./PromptCard";

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {

  return (
    <section className='w-full'>

      <h1 className='head_text text-center'>
        <span className='blue_gradient'>{name} Profile</span>
      </h1>

      <div className="flex-center w-full">
        <p className="desc">{desc}</p>
      </div>

      <div className='mt-10 prompt_layout'>

        {
          data.map((post) => (

            <PromptCard
              key={post._id}
              post={post}
              handleEdit={() => handleEdit && handleEdit(post)}     //Only call handleEdit(post) if handleEdit exists.
              handleDelete={() => handleDelete && handleDelete(post)}
            />
          ))
        }

      </div>

    </section>
  );
};

export default Profile;