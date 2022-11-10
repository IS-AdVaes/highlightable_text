import { useEffect, useState } from "react";
import { fromRange } from "xpath-range";
import {Streamlit, withStreamlitConnection, ComponentProps} from "streamlit-component-lib"

import { annotate } from "./annotate";
import HighlightedSpan from "./HighlightedSpan";

import {
    ControlledMenu,
    MenuItem,
    useMenuState,
    MenuDivider
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';

// Types declarations

type Annotation = {
  text: string;
  annotated: number;
};


/*
const testData: Annotation = {
  text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  annotated: 0
}*/

const getSpan = (xpath: any) => {
  let reg = /span\[(\d+)\]/;
  return xpath.match(reg)[1] - 1;
};

const getXpathParameters = (xpath: any) => {
  const startOffset = xpath.startOffset;
  const endOffset = xpath.endOffset;
  let startContainer = xpath.start;
  // /div[2]/p[7]/text()[1] -> /div[2]/p[7]/text[1]
  startContainer = startContainer.replace(/\(|\)/g, "");
  let endContainer = xpath.end;
  endContainer = endContainer.replace(/\(|\)/g, "");
  return { startOffset, endOffset, startContainer, endContainer };
};

function getSelection() {
  var annotationRange;
  var selection: any = document.getSelection();
  if (selection && selection.toString() !== "") {
    //console.log(selection.toString())

    const range = selection.getRangeAt(0);
    const content = document.getElementById("root");
    let xpath = null;
    if (content) {
      xpath = fromRange(range, content);
    }
    if (xpath) {
      try {
        let {
          startOffset,
          endOffset,
          startContainer,
          endContainer
        } = getXpathParameters(xpath);
        annotationRange = {
          start: startOffset,
          end: endOffset,
          startSpan: getSpan(startContainer),
          endSpan: getSpan(endContainer)
        };
      } catch (e) {
        console.error("User highlight failed.");
      }
    }
  }
  return annotationRange;
}

const TextZone = (props: ComponentProps) => {
  let [datas, setDatas] = useState(props.args.data);
  const [menuProps, toggleMenu] = useMenuState();
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });
  const [stateRange, setStateRange] = useState({startSpan: 0, endSpan: 0, start: 0, end: 0});

  const eventHandler: any = (e: MouseEvent) => {
    let range = getSelection();
    if (range) {
      setAnchorPoint({x : e.pageX, y: e.pageY})
      toggleMenu(true)
      setStateRange(range)
    }
  };

  const highlightHandle0: any = (e: Event) => {
    setDatas([...annotate(
        datas,    
        stateRange.startSpan,
        stateRange.endSpan,
        stateRange.start,
        stateRange.end,
        0
      )]);
      Streamlit.setComponentValue(datas)
      Streamlit.setFrameHeight(300)
  }

  const highlightHandle1: any = (e: Event) => {
    setDatas([...annotate(
        datas,    
        stateRange.startSpan,
        stateRange.endSpan,
        stateRange.start,
        stateRange.end,
        1
      )]);
      Streamlit.setComponentValue(datas)
      Streamlit.setFrameHeight(300)
  }

  const highlightHandle2: any = (e: Event) => {
    setDatas([...annotate(
        datas,    
        stateRange.startSpan,
        stateRange.endSpan,
        stateRange.start,
        stateRange.end,
        2
      )]);
      Streamlit.setComponentValue(datas)
      Streamlit.setFrameHeight(300)
  }

  const highlightHandle3: any = (e: Event) => {
    setDatas([...annotate(
        datas,    
        stateRange.startSpan,
        stateRange.endSpan,
        stateRange.start,
        stateRange.end,
        3
      )]);
      Streamlit.setComponentValue(datas)
      Streamlit.setFrameHeight(300)
  }

  useEffect(() => {
    Streamlit.setFrameHeight(300)
  });

  useEffect(() => {
    document.addEventListener("mouseup", eventHandler);

    // Remove listener on unmount
    return () => {
      document.removeEventListener("mouseup", eventHandler);
    };
  }, []);

  
  return (
    <>
       {datas && 
      <p className="Paragraph">
      {datas.map((d, index) => {
        return (
          <HighlightedSpan key={index} text={d.text} score={d.annotated}/>
        );
      })}
    </p>}
    <ControlledMenu {...menuProps} anchorPoint={anchorPoint}
                onClose={() => toggleMenu(false)}>
                <MenuItem onClick={highlightHandle0}>No interest</MenuItem>
                <MenuItem onClick={highlightHandle1}>Context</MenuItem>
                <MenuItem onClick={highlightHandle2}>KPI data</MenuItem>
                <MenuItem onClick={highlightHandle3}>Relevant sentence/chunk</MenuItem>
                <MenuDivider/>
                <MenuItem>Go to page</MenuItem>
            </ControlledMenu>
    </>
   
  );
};

export default withStreamlitConnection(TextZone);

      /**/