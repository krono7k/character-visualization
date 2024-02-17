import Image from "next/image";
import notFoundImage from '../../public/404.gif';

const Custom404 = () => {
    return <Image className="m-auto" src={notFoundImage} alt="Not found" />
}

  export default Custom404;