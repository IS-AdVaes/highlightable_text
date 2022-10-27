type Annotation = {
  text: string;
  annotated: number;
};

export function annotate(
  data: Annotation[],
  startSpan: number,
  endSpan: number,
  start: number,
  end: number,
  val: number
): Annotation[] {
  // Variables declarations
  var remainderStartAnnotation;
  var remainderEndAnnotation;
  var successor;
  var antecedent;

  // General case
  if (start != 0 && end !== data[endSpan].text.length) {
      remainderStartAnnotation = data[startSpan].text.substring(0, start);
      remainderEndAnnotation = data[endSpan].text.substring(
        end,
        data[endSpan].text.length
      );
      
      antecedent = {
        text: remainderStartAnnotation,
        annotated: data[startSpan].annotated
      };
      successor = {
        text: remainderEndAnnotation,
        annotated: data[endSpan].annotated
      };
      // Shrink the bordering annotations to fit the selections borders
      if (startSpan == endSpan) {
        data[startSpan].text = data[startSpan].text.substring(start, end)
      }
      else {
        data[startSpan].text = data[startSpan].text.substring(start, data[startSpan].text.length);
        data[endSpan].text = data[endSpan].text.substring(0, end);
      }

      // Add the 2 remainders to the list
      data.splice(startSpan, 0, antecedent);
      data.splice(endSpan + 2, 0, successor);
      
      // Change the positions of the selection border spans
      // to their new positions
      startSpan += 1
      endSpan += 2

  // Selection starting at first charachter of Annotation
  } else if (start == 0 && end != data[endSpan].text.length) {
    remainderEndAnnotation = data[endSpan].text.substring(
        end,
        data[endSpan].text.length
      );

      successor = {
        text: remainderEndAnnotation,
        annotated: data[endSpan].annotated
      };
      data[endSpan].text = data[endSpan].text.substring(0, end);

      // Add the 2 remainders to the list
      data.splice(endSpan + 1, 0, successor);
      endSpan += 1
  
      // if end of last paragraph
  } else if (end == data[endSpan].text.length && start != 0) {
    console.log("is end")
    remainderStartAnnotation = data[startSpan].text.substring(0, start);
    antecedent = {
      text: remainderStartAnnotation,
      annotated: data[startSpan].annotated
    };
    data[startSpan].text = data[startSpan].text.substring(start, data[startSpan].text.length);

    data.splice(startSpan, 0, antecedent);
    startSpan += 1
    endSpan += 2
  }
  else {
    endSpan += 1
    console.log("Not handled now...")
  }


  data[startSpan].annotated = val
  if (endSpan > startSpan)
    data[endSpan-1].annotated = val

  var acc = data[startSpan].text
  for (let index = startSpan + 1 ; index < endSpan; index++) {
    acc = acc.concat(data[index].text)
  }
  data.splice(startSpan, (endSpan - startSpan))
  data.splice(startSpan, 0, {text: acc, annotated: val})
  // Merge all the annotations between the selection borders and change their annotation to the selected value
  
  console.log("Data value :", data)


 
  return data
}
