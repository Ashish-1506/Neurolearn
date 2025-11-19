# NeuroLearn Application Flow Diagram

This document outlines the data and logic flow of the NeuroLearn application, from the backend data simulation to the frontend's adaptive user interface.

## 1. Backend: EEG Data Simulation

-   **`neurolearn-backend/server.js`**
    1.  **Initialization**: An Express server is created for API endpoints, and a WebSocket server (`ws`) is attached to it.
    2.  **Client Connection**: When a frontend client connects via WebSocket, a `setInterval` loop begins.
    3.  **State Simulation (Every 2 seconds)**:
        -   A cognitive state (`focused`, `distracted`, `drowsy`, `neutral`) is randomly selected.
        -   Based on the selected state, a corresponding set of 8 floating-point numbers (simulating EEG channel data) is generated.
        -   A JSON object containing the `state` and the `eeg` array is created.
        -   This JSON object is sent to the connected frontend client over the WebSocket.
    4.  **API Endpoints**:
        -   `/api/generate-mnemonic`: Provides a random mnemonic string to the frontend when requested. This simulates a call to a more complex AI content generation pipeline.

## 2. Frontend: Data Reception and Classification

-   **`neurolearn-frontend/src/App.tsx`**
    1.  **WebSocket Connection**: A `useEffect` hook establishes a connection to the backend WebSocket server (`ws://localhost:8080`).
    2.  **Message Handling (`ws.onmessage`)**:
        -   The incoming JSON data (containing `state` and `eeg` data) is parsed.
        -   The raw `eeg` data is stored in the `rawEEGData` state to be passed to the `RawEEGChart` in the header.
        -   The `eeg` data is passed to the `classifyEEG` function.
-   **`neurolearn-frontend/src/ml/classifier.ts`**
    1.  **`classifyEEG` Function**:
        -   A pre-trained `brain.js` neural network (`net`) is used.
        -   The `net.run(eeg)` method is called, which processes the 8 EEG values.
        -   The network outputs the most likely cognitive state (`focused`, `distracted`, `drowsy`, or `neutral`).
        -   This predicted state is returned to `App.tsx`.

## 3. Frontend: State Management and Intervention Logic

-   **`neurolearn-frontend/src/App.tsx`**
    1.  **State Update**: The predicted state from the classifier is stored in the `currentStatus.predictedState` state variable.
    2.  **Intervention Logic (`useEffect` hooks)**: The core logic for adaptive interventions is triggered by changes in `currentStatus` and a new `distractionCount` state variable.

        -   **If `predictedState` is `focused` or `neutral`**:
            -   The `distractionCount` is reset to `0`.
            -   All active interventions are cleared (`isPulsing`, `showToast`, `showCube`, `mnemonic`).

        -   **If `predictedState` is `distracted`**:
            -   The `distractionCount` is incremented.

        -   **If `predictedState` is `drowsy`**:
            -   The "drowsy" intervention is triggered immediately: `showCube` is set to `true`.

        -   **Escalation based on `distractionCount`**:
            -   **`distractionCount` == 2**: The "Ambient Nudge" is triggered. `isPulsing` is set to `true`, causing the `NeuroStatusHeader` icon to pulse.
            -   **`distractionCount` == 3**: The "Toast Notification" is triggered. `isPulsing` is set to `false`. A mnemonic is fetched from the backend (`/api/generate-mnemonic`), and `showToast` is set to `true`.
            -   **`distractionCount` >= 4**: The "Full-Screen Intervention" is triggered. The `interventionActive` flag is set, which displays the mnemonic overlay on the `DashboardPage`.

    3.  **Intervention Timeout**:
        -   When an intervention becomes active (`interventionActive` or `showCube`), a 10-second timer starts.
        -   After 10 seconds, or if the user's state returns to `focused`, the intervention is cleared, and the `distractionCount` is reset.

## 4. Frontend: UI Rendering

-   **`NeuroStatusHeader.tsx`**: Receives the `predictedState`, `rawEEGData`, and the `isPulsing` boolean. It displays the current page title, the live mini EEG chart, and the cognitive status icon (which pulses if `isPulsing` is true).
-   **`NotificationToast.tsx`**: Receives a `show` boolean and content (`mnemonic`). It renders as a small, non-modal pop-up when `show` is true.
-   **`DashboardPage.tsx`**: Receives `showCube` and `mnemonic`.
    -   If `showCube` is true, the `<SpinningCube />` component is rendered as a full-screen overlay.
    -   If `mnemonic` is not null (during a full-screen distraction intervention), it is displayed in the center of the page.
-   **Routing (`App.tsx`)**: `react-router-dom` handles rendering the correct page component (`DashboardPage`, `CoursesPage`, etc.) based on the URL. The `useMemo` hook in `App.tsx` dynamically sets the title in the `NeuroStatusHeader` based on the current route.