import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaCloudUploadAlt } from "react-icons/fa";
import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MarkdownEditor from '@uiw/react-markdown-editor';

const CreateBlog = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageName, setImageName] = useState('');
  const navigate = useNavigate();

  const notify = (message, type) => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      default:
        toast(message);
    }
  };

  async function createBlog(formData) {
    try {
       await axiosInstance.post(
        `/admin/create-blog`,
        formData
      );

      notify("Blogs created successfully!", "success");
      setTimeout(() => {
        navigate("/create-blog");
      }, 3000);

    } catch (error) {
      if (error.response) {
        notify(
          error?.response?.data?.error ||
            "some error occurred! plese try again",
          "error"
        );
      } else {
        notify("some error occurred! plese try again", "error");
      }
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      bloggerName: '',
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Title is required'),
      description: Yup.string().required('Description is required'),
      bloggerName: Yup.string().required('Blogger Name is required'),
      image: Yup.mixed().required('Image is required'),
    }),
    onSubmit: async(values) => {

      const formData = new FormData();

        formData.append("title", values?.title);
        formData.append("description", values?.description);
        formData.append("bloggerName", values?.bloggerName);
        formData.append("image", values?.image);
        createBlog(formData)
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue('image', file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setImageName(file.name)
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-[#FFFFFF] h-fits h-[85vh] overflow-y-auto m-2 p-2 px-4 font-Inter relative">
        <ToastContainer />
      <h2 className="text-lg md:text-xl text-[#3B3935] font-semibold my-1">
        Create Blog
      </h2>
    <form onSubmit={formik.handleSubmit} className="mt-[1rem] w-[95%] mx-auto md:w-full grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 pb-[2rem]">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title
        </label>
        <textarea
          id="title"
          name="title"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title}
          rows='10'
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {formik.touched.title && formik.errors.title ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.title}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block text-gray-700 font-bold mb-2">
          Description
        </label>
        <MarkdownEditor
      name="description"
            value={formik.values.description}
            height="200px"
            onChange={(value) => {
              formik.setFieldValue("description", value);
            }}
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

    />
        {formik.touched.description && formik.errors.description ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.description}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label htmlFor="bloggerName" className="block text-gray-700 font-bold mb-2">
          Blogger Name
        </label>
        <input
          type="text"
          id="bloggerName"
          name="bloggerName"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.bloggerName}
          className="shadow appearance-none border rounded w-full py-[10px] px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {formik.touched.bloggerName && formik.errors.bloggerName ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.bloggerName}</div>
        ) : null}
      </div>

      <div className="mb-4">
      <div className='mb-4'>
        <label htmlFor="image" className="block text-gray-700 font-bold mb-2">
          Image
        </label>

        <div className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
            <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          className="hidden"
        />
            <label htmlFor="image" className='flex items-center gap-4'>
            <FaCloudUploadAlt className='text-2xl' />
            <p>{imageName || 'Not uploded'}</p>
            </label>
        </div>
        

        {formik.touched.image && formik.errors.image ? (
          <div className="text-red-500 text-sm mt-1">{formik.errors.image}</div>
        ) : null}
      </div>

      {imagePreview && (
        <div className="mb-4">
          <img src={imagePreview} alt="Preview" className="max-w-full rounded-lg w-fit h-[200px]" />
        </div>
      )}
      </div>

      <div className="mb-4 md:col-span-2 flex items-center justify-center">
        <button
          type="submit"
        className="bg-[#F89D28] hover:bg-[#f89e28ee] text-white border border-[#989898] shadow-MobileNoBox md:rounded-xl w-[40%] p-3 md:p-2 lg:p-3"
        >
          Submit
        </button>
      </div>
    </form>
    </div>
  );
};

export default CreateBlog;
