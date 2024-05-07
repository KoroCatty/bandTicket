import Image from 'next/image'

const HeroContact = () => {
  return (
    <section>
    <Image src="/images/heroContact.jpg" alt="About" width={1200} height={600}
      className="w-full h-[480px] object-cover max-[480px]:h-[400px] "
    />
    <div className="absolute top-[25%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 text-center w-[50%]
    max-[768px]:w-[80%] max-[480px]:left-[55%]
    ">
      <h1 className="text-[5rem] tracking-wide text-white font-bold mb-4 
      max-[767px]:text-[3.5rem] max-[480px]:text-[2.7rem] max-[480px]:mb-2 max-[480px]:leading-[2.5rem
      ">Contact Us</h1>

    </div>
</section>
  )
}

export default HeroContact