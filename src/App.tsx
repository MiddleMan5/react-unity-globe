import React, { useEffect, useState } from "react";

import "./App.css";

import Unity, { UnityContext } from "react-unity-webgl";

const unityProjectName = "react-globe";
const unityBuildRoot = `${unityProjectName}/Build`;

const files = {
  loaderUrl: `${unityBuildRoot}/${unityProjectName}.loader.js`,
  dataUrl: `${unityBuildRoot}/${unityProjectName}.data`,
  frameworkUrl: `${unityBuildRoot}/${unityProjectName}.framework.js`,
  codeUrl: `${unityBuildRoot}/${unityProjectName}.wasm`,
};

const unityContext = new UnityContext(files);

function App() {
  const [progression, setProgression] = useState(0);

  useEffect(function () {
    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {progression !== 1 && <p>Loading {progression * 100} percent...</p>}
      <Unity
        unityContext={unityContext}
        style={{ flexGrow: 1, width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default App;
