import animationData from '../../assets/animations/wave-white.json'
import { motion, AnimatePresence } from 'framer-motion';
import { useLottie } from 'lottie-react';
const Loading = () => {

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    const { View } = useLottie(defaultOptions)

    return (
      <AnimatePresence>
        <motion.div
          className="loading w-full h-full flex flex-row justify-center items-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="load-wrap  w-4/12 h-4/12">{View}</div>
        </motion.div>
      </AnimatePresence>
    );
};

export default Loading;