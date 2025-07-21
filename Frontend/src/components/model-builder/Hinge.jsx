// src/components/Hinge.jsx
import React, { useState, useMemo } from 'react';
import { useModelStore }            from '../../stores/useModelStore';
import { getTemplateByName }        from '../../api/jsonTemplates';
import { shallow }                  from 'zustand/shallow';
import './Hinge.css';
const Hinge = () => {
  const [nodeId, setNodeId]       = useState('');
  const [elementID, setElementID] = useState('');

  // store actions & data
  const addComponent        = useModelStore(s => s.addComponent);
  const updateComponentArgs = useModelStore(s => s.updateComponentArgs);
  const nodes    = useModelStore(s => s.node, shallow);
  const elements = useModelStore(s => s.element, shallow);

  // fetch each template once
  const nodeTpl   = useMemo(() => getTemplateByName('nodeLite', 'Node'), []);
  const matTpl    = useMemo(() => getTemplateByName('uniaxialMaterialLite', 'Elastic', /* tag filter inside helper */), []);
  const hingeTpl  = useMemo(() => getTemplateByName('elementLite', 'zeroLength'), []);

const handleAdd = () => {
  const oldNodeId = +nodeId;
  const oldEleId  = +elementID;
  if (!oldNodeId || !oldEleId) {
    return alert('❗ Enter valid Node & Element IDs.');
  }

  // find by args[0]/args[1] in the lite arrays
  const origNode = nodes.find(n => n.args[0] === oldNodeId);
  if (!origNode) return alert(`❗ Node ${oldNodeId} not found.`);
  const origEle = elements.find(e =>
    e.args[1] === oldEleId
  );
  if (!origEle) return alert(`❗ Element ${oldEleId} not found.`);

  // compute new tags
  const newNodeId       = 1000 + oldNodeId;
  const matId1          = newNodeId + 1;
  const matId2          = newNodeId + 2;
  const zeroLengthEleId = 10000 + oldNodeId;

  const [, x, y] = origNode.args;

  // 1) two new materials (lite)
  addComponent('uniaxialMaterialLite', matTpl.name, {
    ...matTpl.defaultParams,
    'Material ID': matId1,
    'Elasticity':   1e12
  });
  addComponent('uniaxialMaterialLite', matTpl.name, {
    ...matTpl.defaultParams,
    'Material ID': matId2,
    'Elasticity':   1e12
  });

  // 2) new node (lite)
  addComponent('nodeLite', nodeTpl.name, {
    ...nodeTpl.defaultParams,
    'Node ID':          newNodeId,
    'X Coordinate (m)': x,
    'Y Coordinate (m)': y
  });

  // 3) new zeroLength element (lite)
  addComponent('elementLite', hingeTpl.name, {
    ...hingeTpl.defaultParams,
    'eleTag':   zeroLengthEleId,
    'eleNodes': [ oldNodeId, newNodeId ],
    'matTags':  [ matId1,     matId2    ],
    'dirs':     [ 1, 2, 3     ]
  });

  // 4) patch the original element by **store ID**, not tag
const patchedArgs = origEle.args.map((val, idx) => {
  // only replace in args[2] or args[3]
  if ((idx === 2 || idx === 3) && val === oldNodeId) {
    return newNodeId;
  }
  return val;
});

// Now update via the store—use your lite‐category if in lite mode
updateComponentArgs(origEle.category, origEle.id, patchedArgs);

  alert('✅ Hinge added successfully!');
};


  return (
    <div className="hinge-panel p-4 bg-gray-50 rounded shadow">
      <h3 className="text-lg font-medium mb-2">Add Hinge</h3>
      <input
        type="number"
        placeholder="Node ID"
        value={nodeId}
        onChange={e => setNodeId(e.target.value)}
        className="border p-2 mb-2 w-full rounded"
      />
      <input
        type="number"
        placeholder="Element ID"
        value={elementID}
        onChange={e => setElementID(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />
      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add ➕
      </button>
    </div>
  );
};

export default Hinge;
