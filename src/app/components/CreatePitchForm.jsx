'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import MDEditor from '@uiw/react-md-editor';
// import {useSession} from "next-auth/react";
import { useRouter } from 'next/navigation';


function CreatePitchForm(props) {
  const router=useRouter()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [pitch, setPitch] = React.useState("");

    const session=props.session
    const user_id=session.user.id
//   const { data: session, status } = useSession();

  const onSubmit = async(data) => {
    const pitchesData = { ...data, pitch,user_id };
    console.log('Pitches Data:', pitchesData);
    // Further processing of pitchesData

    const response = await fetch('/api/createpitch', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(pitchesData),
      });

      console.log('✌️response --->', response);
      router.push('/');
  };

  return (
    <div className='createPitchForm'>
      <form onSubmit={handleSubmit(onSubmit)} className='startup-form'>
        <div className="form-group flex flex-col">
          <label htmlFor="title" className='startup-form_label'>Title</label>
          <input
            className='startup-form_input'
            type="text"
            {...register('title', { required: 'Title is required' })}
            placeholder='Title'
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>

        <div className="form-group flex flex-col mt-2">
          <label htmlFor="description" className='startup-form_label'>Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            id="desc"
            className='startup-form_textarea'
            placeholder='Short Description Of Your Startup Idea'
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}
        </div>

        <div className="form-group flex flex-col">
          <label htmlFor="Category" className='startup-form_label'>Category</label>
          <input
            className='startup-form_input'
            type="text"
            {...register('category', { required: 'Category is required' })}
            placeholder='Choose a category (eg. Tech, Education, Health etc...)'
          />
          {errors.Category && <p className="text-red-500">{errors.Category.message}</p>}
        </div>

        <div className="form-group flex flex-col">
          <label htmlFor="link" className='startup-form_label'>Image/Video Link</label>
          <input
            className='startup-form_input'
            type="text"
            {...register('link', { required: 'Link is required' })}
            placeholder='Post a link to your demo or promotional link'
          />
          {errors.link && <p className="text-red-500">{errors.link.message}</p>}
        </div>

        <div className="form-group flex flex-col">
          <label htmlFor="pitch" className='startup-form_label'>Pitch</label>
          <MDEditor
            value={pitch}
            onChange={(value) => setPitch(value)}
            id='pitch'
            preview='edit'
            className='startup-form_editor'
            textareaProps={{
              placeholder: "Briefly describe your idea and what problem it solves"
            }}
          />
        </div>

        <button type='submit' className='py-2 px-5 bg-pink-600 rounded-full font-bold text-[white]'>
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreatePitchForm;
