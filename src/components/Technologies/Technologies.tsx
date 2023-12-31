import { FC, useMemo } from 'react';
import HtmlIcon from '~/images/html5-icon.svg';
import CssIcon from '~/images/css-icon.svg';
import JavascriptIcon from '~/images/js-icon.svg';
import RwdIcon from '~/images/rwd-icon.svg';
import ReactIcon from '~/images/react-icon.svg';
import ReduxIcon from '~/images/redux-icon.svg';
import TypescriptIcon from '~/images/ts.svg';
import SassIcon from '~/images/sass-icon.svg';
import StyledComponentsIcon from '~/images/styled-components-icon.svg';
import AngularIcon from '~/images/angular-icon.svg';
import GitIcon from '~/images/git-icon.svg';
import RxJsIcon from '~/images/rxjs.svg';
import ScrumIcon from '~/images/scrum-icon.svg';
import WebpackIcon from '~/images/webpack-icon.svg';
import JestIcon from '~/images/jest-icon.svg';
import NextJsIcon from '~/images/nextjs-icon.svg';
import ViteIcon from '~/images/vite-icon.svg';
import VitestIcon from '~/images/vitest-icon.svg';
import ReactTestingLibraryIcon from '~/images/react-testing-library-icon.svg';
import { useTranslation } from 'next-i18next';
import styles from './Technologies.module.scss';
import { Technology } from '@/models/Technology';
import { Variants, motion } from 'framer-motion';
import { AnimatedText } from '@/components/AnimatedText/AnimatedText';

const technologies: Technology[] = [
  {
    icon: <HtmlIcon />,
    title: 'HTML5',
  },
  {
    icon: <CssIcon />,
    title: 'CSS3',
  },
  {
    icon: <JavascriptIcon />,
    title: 'JavaScript(ES6)',
  },
  {
    icon: <RwdIcon />,
    title: 'RWD',
    description: 'bar',
  },
  {
    icon: <ReactIcon />,
    title: 'React',
  },
  {
    icon: <ReduxIcon />,
    title: 'Redux',
  },
  {
    icon: <NextJsIcon />,
    title: 'Next',
  },
  {
    icon: <TypescriptIcon />,
    title: 'TypeScript',
  },
  {
    icon: <SassIcon />,
    title: 'Sass(SCSS/LESS)',
  },
  {
    icon: <StyledComponentsIcon />,
    title: 'Styled Components',
  },
  {
    icon: <AngularIcon />,
    title: 'Angular',
  },
  {
    icon: <RxJsIcon />,
    title: 'RxJS',
  },
  {
    icon: <GitIcon />,
    title: 'Git',
  },
  {
    icon: <ScrumIcon />,
    title: 'Scrum',
  },
  {
    icon: <WebpackIcon />,
    title: 'Webpack',
  },
  {
    icon: <ViteIcon />,
    title: 'Vite',
  },
  {
    icon: <JestIcon />,
    title: 'Jest',
  },
  {
    icon: <ReactTestingLibraryIcon />,
    title: 'React Testing Library',
  },
  {
    icon: <VitestIcon />,
    title: 'Vitest',
  },
];

const fadeInAnimationVariant: Variants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: (idx: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.05 * idx,
    },
  }),
};

export const Technologies: FC = () => {
  const { t } = useTranslation();

  const renderTechnologiesSection = useMemo(
    () =>
      technologies.map(({ icon, title }, idx) => (
        <motion.div
          key={`${title}-${idx}`}
          className={styles.imgSection}
          variants={fadeInAnimationVariant}
          initial={'initial'}
          whileInView={'animate'}
          viewport={{
            once: true,
          }}
          custom={idx}
        >
          <div className={styles.imgContainer}>{icon}</div>
          <p className={styles.imgHeader}>{title}</p>
        </motion.div>
      )),
    [],
  );

  return (
    <section className={styles.container} id='technologies'>
      <div className={styles.technologiesHeader}>
        <AnimatedText
          text={t('technologiesSection.header')}
          className={styles.technologiesTitle}
          el='h2'
        />
      </div>
      <div className={styles.technologiesBackground}>
        <div className={styles.technologiesSection}>
          {renderTechnologiesSection}
        </div>
        <div className={styles.angleContainer}></div>
      </div>
    </section>
  );
};
