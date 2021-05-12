export type Files = Record<
  string,
  {
    content: string;
  }
>;

export type Asset = {
  code?: string | null;
  dependencies: string[];
};

export type DepGraph = Record<string, Asset>;

export type BundlerWorkerMessage =
  | {
      type: 'BUILD_DEP_GRAPH';
      payload: {
        files: Files;
        entryPoint?: string;
        invalidateFiles: string[];
      };
    }
  | {
      type: 'DEP_GRAPH_READY';
      payload: {
        depGraph: DepGraph;
      };
    }
  | {
      type: 'ERR';
      payload: {
        err: Error;
      };
    }
  | {
      type: 'TRANSFORM';
      payload: {
        filePath: string;
        code: string;
      };
    }
  | {
      type: 'TRANSFORM_READY';
      payload: {
        filePath: string;
        transformedCode: string;
      };
    };
