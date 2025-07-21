// src/pages/ModelBuilderPage.jsx
import { useState, useEffect } from "react";
import ParametricEditorLite from "../components/model-builder/ParametricEditorLite";
import PatternEditorLite from "../components/model-builder/PatternEditorLite";
import SectionEditor from "../components/model-builder/SectionEditor";
import ModelViewer from "../components/visualization/ModelViewer";
import Hinge from "../components/model-builder/Hinge";
import { useUserTypeStore } from "../utils/storeUserType";
import { useModelStore } from "../stores/useModelStore";
import "./ModelBuilderPage.css";
import Description from "../components/model-builder/Description";
const ModelBuilderPageLite = () => {
  const [modelJson, setModelJson] = useState(useModelStore.getState().toJson());
  const initializeDefaults = useModelStore((s) => s.initializeDefaults);
  const status = useUserTypeStore((s) => s.status);
  const modelConfig = useModelStore((state) => state.modelConfig);
  const modelType = modelConfig.ndf === 3 ? "frame" : "truss";
  useEffect(() => {
    initializeDefaults();
  }, [status, initializeDefaults]);

  useEffect(() => {
    const unsubscribe = useModelStore.subscribe(() =>
      setModelJson(useModelStore.getState().toJson())
    );
    return unsubscribe;
  }, []);

  const [activeTab, setActiveTab] = useState("model");

  const renderEditor = () => {
    switch (activeTab) {
      case "model":
        return (
          <>
            <ParametricEditorLite category="modelLite" />
            <Description category="model" />
          </>
        );
      case "nodes":
        return (
          <>
            <ParametricEditorLite category="nodeLite" />
            <Description category="node" />
          </>
        );
      case "supports":
        return (
          <>
            <ParametricEditorLite category="boundaryConditionsLite" />
            <Description category="supports" />
          </>
        );
      case "materials":
        return (
          <>
            <ParametricEditorLite category="uniaxialMaterialLite" />
            <Description category="materials" />
          </>
        );
      case "sections":
        return <SectionEditor />;
      case "timeSeries":
        return <ParametricEditorLite category="timeSeriesLite" />;
      case "pattern":
        return (
          <>
            <PatternEditorLite />
            <Description category="pattern" />
          </>
        );
      case "elements":
        return (
          <>
            <ParametricEditorLite category="elementLite" />
            <Description category="element" />
          </>
        );
      case "integrations":
        return <ParametricEditorLite category="beamIntegrationLite" />;
      case "transformations":
        return <ParametricEditorLite category="geomTransfLite" />;
      case "hinge":
        return (
          <>
            <Hinge />
            <Description category="hinge" />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="model-builder">
      <div className="model-editors-panel">
        <div className="tabs">
          {[
            "model",
            "nodes",
            "supports",

            ...(modelType === "truss" ? ["materials"] : []),
            // 'sections',
            // 'transformations',
            // 'integrations',
            "elements",
            // 'timeSeries',
            "pattern",
            ...(modelType === "frame" ? ["hinge"] : []),
          ].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div className="editor-container">{renderEditor()}</div>
      </div>
      <div className="visualization-panel">
        <ModelViewer />
      </div>
    </div>
  );
};

export default ModelBuilderPageLite;
