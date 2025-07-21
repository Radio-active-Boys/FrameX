import React from 'react';
import './Description.css';
// import nodeImg from '../assets/node.png';
// import hingeImg from '../assets/hinge.png';
// import elementImg from '../assets/element.png';

const dataMap = {
  model: {
    title: 'Model',
    points: [
      'Choose the basic setup of your structural model.',
      'Make sure you consistently use one unit system (e.g. N/m, kN/mm, ft/in) throughout your model — for example, if you choose meters and Newtons, stick with them.',
      'All further definitions like nodes, elements, and loads will follow this base configuration.',
      'You must define the model setup before adding any geometry or boundary conditions.',
    ],
  },
  materials: {
  title: 'Material',
  // img: nodeImg,
  points: [
      'Material Id refers to its unique number > 1.',

  ],
  },
  node: {
    title: 'Node',
    // img: nodeImg,
    points: [
      'Node Id refers to unique number > 1 (for unique naming).',
      'To capture internal moment, add a node at the location before defining an element.',
      'To define a hinge, place a node there and note its NodeId.',
    ],
  },
  hinge: {
    title: 'Hinge',
    // img: hingeImg,
    points: [
      'Hinge needs the Node Id and the Element Id of the connected member.',
      'If two members connect, choose the one you want the hinge on.',
      'If more than two members meet at a node, define one less hinge than members.',
      'Try to add hinges only when your full model setup is ready.',
    ],
  },
  element: {
    title: 'Element',
    // img: elementImg,
    points: [
      'Element Id refers to its unique number > 1.',
    ],
  },
  supports: {
  title: 'Support',
  // img: nodeImg,
  points: [
    'Value can be 0 or 1.',
    '0 means free.',
    '1 means restricted.',
  ],
  },
pattern: {
  title: 'Pattern (Load Pattern)',
  // img: patternImg, 
  points: [
    'A “Pattern” groups one or more loads under a single ID .',
    'Pattern ID must be a unique integer ≥1, defined before you attach any loads.',
    'Attach loads (nodal and element ) to that Pattern ID.',
    'Truss models support only nodal loads (`load`).',
    'Frame/beam–column models support both nodal and element loads.',
    'For element loads, the loading directions use the element’s local coordinate system.',
    // 'You can reuse a Pattern ID to collect multiple load commands; simply issue your loads with the same Pattern ID.',
  ],
},


};

const Description = ({ category }) => {
  const info = dataMap[category] || {
    title: 'Unknown',
    img: null,
    points: ['No information available.'],
  };

  return (
    <div className="description">
      {info.img && (
        <div className="description__image-wrapper">
          <img
            src={info.img}
            alt={info.title}
            className="description__image"
          />
        </div>
      )}
      {/* <h3 className="description__title">{info.title}</h3> */}
      <ul className="description__list">
        {info.points.map((pt, i) => (
          <li key={i} className="description__item">
            {pt}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Description;
