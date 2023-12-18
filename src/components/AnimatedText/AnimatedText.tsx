import { Variant, motion, useAnimation, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';
import styles from './AnimatedText.module.scss';
import { useTranslation } from 'next-i18next';

type AnimatedTextProps = {
  text: string | string[];
  el?: keyof JSX.IntrinsicElements;
  className?: string;
  once?: boolean;
  repeatDelay?: number;
  animation?: {
    hidden: Variant;
    visible: Variant;
  };
};

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export const AnimatedText = ({
  text,
  el: Element = 'p',
  className,
  once = true,
  repeatDelay,
  animation = defaultAnimations,
}: AnimatedTextProps) => {
  const controls = useAnimation();
  const textArray = Array.isArray(text) ? text : [text];
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5, once });

  const { i18n } = useTranslation();

  const currentLocale = i18n?.language;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const show = () => {
      controls.start('visible');
      if (repeatDelay) {
        timeout = setTimeout(async () => {
          await controls.start('hidden');
          controls.start('visible');
        }, repeatDelay);
      }
    };

    if (isInView) {
      show();
    } else {
      controls.start('hidden');
    }

    return () => clearTimeout(timeout);
  }, [isInView, currentLocale]);

  return (
    <Element className={className}>
      <span className={styles.screenReaderOnly}>{textArray.join(' ')}</span>
      <motion.span
        ref={ref}
        initial='hidden'
        animate={controls}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {},
        }}
      >
        {textArray.map((line, idx) => (
          <span
            style={{
              display: 'block',
            }}
            key={`${line}-${idx}`}
          >
            {line.split(' ').map((word, wordIndex) => (
              <span
                style={{
                  display: 'inline-block',
                }}
                key={`${word}-${wordIndex}`}
              >
                {word.split('').map((char, charIndex) => (
                  <motion.span
                    key={`${char}-${charIndex}`}
                    style={{
                      display: 'inline-block',
                    }}
                    variants={animation}
                  >
                    {char}
                  </motion.span>
                ))}
                <span
                  style={{
                    display: 'inline-block',
                  }}
                >
                  &nbsp;
                </span>
              </span>
            ))}
          </span>
        ))}
      </motion.span>
    </Element>
  );
};