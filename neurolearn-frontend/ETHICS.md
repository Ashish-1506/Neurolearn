# NeuroLearn: Ethics & Safety Brief

This document outlines the ethical considerations and safety measures designed into the NeuroLearn prototype, in accordance with the hackathon's focus on responsible innovation.

## 1. Core Principle: User Sovereignty and Privacy

Our guiding principle is that the user must have full control and ownership of their personal neurological data. The system is designed to be transparent, consensual, and secure.

## 2. Data Handling & Privacy by Design

**Local-First Processing:** All sensitive brainwave (EEG) data classification happens directly in the user's browser.
- **No Cloud Transmission:** Raw or classified neurological data is **never** sent to or stored on a remote server. The backend's role is purely for simulating data in this prototype.
- **No Data Persistence:** The frontend application does not store or log raw EEG streams. Historical cognitive state data is kept in memory only for the duration of the session for visualization and is discarded upon closing the tab.

## 3. User Consent and Transparency

**Explicit Onboarding:**
- The first time a user opens NeuroLearn, they are presented with a clear, easy-to-understand onboarding modal (`OnboardingModal.tsx`).
- This modal explicitly states:
    1.  What the application does (monitors cognitive state to help learning).
    2.  That the EEG data is **simulated** for this prototype.
    3.  That all processing occurs locally on their device.
- The user must actively click "Get Started" to dismiss the modal and use the application. This action serves as explicit consent.

**Continuous & Unambiguous Feedback:**
- The `NeuroStatusHeader.tsx` component provides a constant, real-time display of the user's classified cognitive state.
- This ensures the user is always aware of what the system is inferring, preventing any "black box" ambiguity.

## 4. User Comfort and Minimal Intrusion

**Intervention Design:**
- Interventions are designed to be helpful, not jarring.
- The "distracted" state triggers a mnemonic, a contextually relevant and useful piece of information.
- The "drowsy" state triggers a gentle, rotating 3D cube (`SpinningCube.tsx`), designed as a non-disruptive "brain break" to re-engage focus.

**User Control:**
- Interventions are temporary and automatically dismiss after a short period (10 seconds).
- If the user's state returns to "focused," the intervention is immediately dismissed, respecting the user's natural cognitive flow.
- Future iterations would include settings to disable or customize interventions, further enhancing user control.

## 5. Simulation and Future-Proofing

For this prototype, all EEG data is simulated. This is a critical safety and development feature, allowing us to build and test the platform's logic without requiring a live BCI and real user data.

Should this project move forward to integrate a real BCI SDK (like OpenBCI), the architectural foundation of local-only processing ensures that the system remains private and secure by design. The consent flow would be updated to include a request for connecting the BCI device.
