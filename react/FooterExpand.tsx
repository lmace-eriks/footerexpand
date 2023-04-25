import React, { ReactChildren, useEffect, useRef, useState } from "react";

// Styles
import styles from "./styles.css";

interface FooterExpandProps {
  mainMenu: Array<string>
  children: ReactChildren | any
}

const FooterExpand: StorefrontFunctionComponent<FooterExpandProps> = ({ mainMenu, children }) => {
  const openGate = useRef(true);
  const childWidth = useRef(0);
  const infoWindow: any = useRef();
  const train: any = useRef();
  const buttonRefs: any = useRef([]);
  const [activeList, setActivelist] = useState<Array<Boolean>>([]);
  const [trainPosition, setTrainPosition] = useState<number>(0);

  useEffect(() => {
    if (!openGate.current || !window) return;
    openGate.current = false;

    // Get width of infoWindow from CSS
    const infoWindowStyles = window.getComputedStyle(infoWindow.current);
    const infoWindowWidthInPx = infoWindowStyles.getPropertyValue("width");
    const infoWidowWidth = Number(infoWindowWidthInPx.replace("px", ""));
    childWidth.current = infoWidowWidth;

    // Build activeList for menus
    const tempActiveList: Array<Boolean> = [];
    for (let index = 0; index < mainMenu.length; index++) {
      tempActiveList.push(!index ? true : false);
    }
    setActivelist(tempActiveList);
  }, []);

  const handleClick = (buttonIndex: number) => {
    const tempActiveList = [];

    for (let index = 0; index < activeList.length; index++) {
      tempActiveList[index] = buttonIndex === index ? true : false;
    }

    setTrainPosition(buttonIndex * childWidth.current);
    setActivelist(tempActiveList);
  }

  const setRef = (element: any, refList: any) => {
    // Conditional prevents overflow during re-render
    if (refList.current.length >= mainMenu.length) return;
    refList.current.push(element);
  }

  return (<>
    <div className={styles.buttonContainer}>
      {mainMenu.map((item, index) => (
        <button
          key={`button-${index}`}
          ref={(e) => setRef(e, buttonRefs)}
          className={`${styles.button} ${activeList[index] ? styles.buttonActive : ""}`}
          aria-expanded={activeList[index] ? "true" : "false"}
          aria-controls={`menu-child-${index}`}
          onClick={() => handleClick(index)}>
          {item}
          <div className={styles.arrow}>▶</div>
        </button>
      ))}
    </div>
    <div ref={infoWindow} id="menu-window" className={styles.menuContainer}>
      <div ref={train} style={{ transform: `translateX(-${trainPosition}px)` }} className={styles.menuTrain}>
        {children.map((child: any, index: number) => (
          <div
            key={`child-${index}`}
            id={`menu-child-${index}`}
            aria-hidden={activeList[index] ? "false" : "true"}
            style={{ width: childWidth.current }}
            className={styles.childContainer}>
            {child}
          </div>
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
