import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          className="pointer-events-none fixed inset-0 z-[90] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at top, color-mix(in oklch, var(--primary-color) 10%, var(--background)) 0%, color-mix(in oklch, var(--background) 96%, black 4%) 68%)",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="flex flex-col items-center gap-5"
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="relative flex h-20 w-20 items-center justify-center rounded-full border"
              style={{
                borderColor:
                  "color-mix(in oklch, var(--primary-color) 45%, transparent)",
                background:
                  "color-mix(in oklch, var(--primary-color) 12%, transparent)",
                boxShadow:
                  "0 0 32px color-mix(in oklch, var(--primary-color) 16%, transparent)",
              }}
            >
              <span className="pl-1 text-lg font-bold tracking-[0.4em] text-foreground">
                GK
              </span>
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.14, 1], opacity: [0.4, 0.9, 0.4] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor:
                    "color-mix(in oklch, var(--secondary-color) 38%, transparent)",
                }}
              />
            </motion.div>

            <div className="flex flex-col items-center gap-2">
              <motion.p
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="text-xs uppercase tracking-[0.45em] text-muted-foreground"
              >
                Building the portfolio
              </motion.p>
              <div className="h-px w-28 overflow-hidden rounded-full bg-border/70">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="h-full w-1/2 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, var(--primary-color) 50%, transparent 100%)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
