import image from '../../public/notfound.png'

const NotFound = () => {
    return (
        <div>
            <img src={image} alt="NotFound" className='w-full'/>
            
        </div>
    );
};

export default NotFound;