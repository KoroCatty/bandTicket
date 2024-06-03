const MailForm = () => {
  return (
    <section className="my-[8rem] pt-[6rem] font-['Freight'] font-light">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          JOIN OUR MAILING LIST
        </h2>
        <p className="text-base md:text-lg mx-auto mb-6 w-4/5 md:w-3/5">
          Get the latest updates, news and product offers via email
        </p>
        <form className="py-5 w-10/12 md:w-3/5 mx-auto">
          <input
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Enter your email address"
          />
          <button
            className="w-[40%] mt-6 px-4 py-2 bg-slate-800 border-2 border-slate-300 text-white rounded hover:opacity-80 transition duration-300 ease-in-out focus:outline-none focus:ring-2 "
            type="submit"
          >
            Subscribe
          </button>
        </form>
        <small className="text-center mt-4">No spam, just good times.</small>
      </div>
    </section>
  );
};

export default MailForm;
