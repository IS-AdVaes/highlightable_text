# highlightable_text

Highlightable text component made with React for data labelling purposes.

### Install

Install with pip (Need a ssh-key on the machine you are using): 
`pip install git+ssh@github.com:ITAdVESG/highlightable_text.git`

### Usage

```py
import streamlit
from st_highlightable_text import highlightable_text

data = [
  {
    text: 'Hello World!',
    annotated: 1
]

highlightable_text(data)



