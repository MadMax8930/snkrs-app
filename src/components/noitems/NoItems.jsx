import Link from 'next/link';
import Image from 'next/image';
import PropTypes from 'prop-types';
import styles from './noitems.module.css';

const NoItems = ({ variation, title, description, imageSrc, imageAlt, linkHref }) => {
  return (
    <div className={`${styles[`${variation}Container`]} layer`}>
      <Link href={linkHref} className={`${styles[`${variation}Link`]}`}>
        <h1 className={`${styles[`${variation}Title`]}`}>{title}</h1>
        <p className={`${styles[`${variation}Description`]}`}>{description}</p>
        <Image className={`${styles[`${variation}Image`]}`} src={imageSrc} width={100} height={100} alt={imageAlt} />
      </Link>
    </div>
  )
}

NoItems.propTypes = {
   variation: PropTypes.oneOf(['ns', 'nc', 'nb', 'nk']).isRequired,
   linkHref: PropTypes.string.isRequired,
   title: PropTypes.string.isRequired,
   description: PropTypes.string.isRequired,
   imageSrc: PropTypes.string.isRequired,
   imageAlt: PropTypes.string.isRequired,
};

export default NoItems