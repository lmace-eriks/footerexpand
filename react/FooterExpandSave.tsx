import React, { ReactChildren, useEffect, useRef } from "react";
import { canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

interface FooterExpandProps {
  mainMenu: Array<string>
  vtexMenuClass: string
  children: ReactChildren | any
}

const childWidth = 20;

const FooterExpand: StorefrontFunctionComponent<FooterExpandProps> = ({ mainMenu, children }) => {
  const openGate = useRef(true);
  const infoWindow: any = useRef();
  const buttonRefs: any = useRef([]);
  const train: any = useRef();

  useEffect(() => {
    if (!openGate.current) return;
    openGate.current = false;

  }, []);

  const handleClick = (index: number) => {
    train.current.style.transform = `translateX(-${index * childWidth}rem)`;
    inactivateButtons();
    buttonRefs.current[index].classList.add(styles.buttonActive);
  }

  const inactivateButtons = () => {
    buttonRefs.current.forEach((button: any) => {
      button.classList.remove(styles.buttonActive);
    });
  }

  const setRef = (element: any, refList: any) => {
    // Conditional prevents overflow during re-render - LM
    if (refList.current.length >= mainMenu.length) return;
    refList.current.push(element);
  }

  return (<>
    <div className={styles.buttonContainer}>
      {mainMenu.map((item, index) => (
        <button ref={(e) => setRef(e, buttonRefs)} key={`button-${index}`} aria-expanded="false" aria-controls="menu-window" data-index={index} onClick={() => handleClick(index)} className={`${styles.button} ${!index ? styles.buttonActive : ""}`}>
          {item}<div className={styles.arrow}>▶</div>
        </button>
      ))}
    </div>
    <div ref={infoWindow} id="menu-window" aria-hidden="true" aria-live="polite" className={styles.menuContainer}>
      <div ref={train} className={styles.menuTrain}>
        {children.map((child: any, index: number) => (
          <div key={`child-${index}`} className={styles.childContainer}>{child}</div>
        ))}
      </div>
    </div>
  </>);
}

FooterExpand.schema = {
  title: "Footer Expand",
  description: "",
  type: "object",
  properties: {

  }
}

export default FooterExpand;