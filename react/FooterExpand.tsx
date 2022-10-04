import React, { useEffect, useMemo, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";

// Styles
import styles from "./styles.css";

interface FooterExpandProps {

}

const FooterExpand: StorefrontFunctionComponent<FooterExpandProps> = ({ }) => {

  return (
    <div>Hello World</div>
  )
}

FooterExpand.schema = {
  title: "Footer Expand",
  description: "",
  type: "object",
  properties: {

  }
}

export default FooterExpand;