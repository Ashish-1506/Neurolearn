const SettingsPage = () => {

    const SettingSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
        <div className="mb-8">
            <h2 className="text-xl font-semibold text-text-primary border-b border-dark-border pb-2 mb-4">{title}</h2>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );

    const FormRow = ({ label, children }: { label: string, children: React.ReactNode }) => (
        <div className="flex items-center justify-between">
            <label className="text-text-secondary">{label}</label>
            {children}
        </div>
    );

    const ToggleSwitch = () => (
        <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
            <input type="checkbox" name="toggle" id="toggle" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
            <label htmlFor="toggle" className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
        </div>
    );

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-text-primary">Settings</h1>
            
            <div className="bg-dark-panel border border-dark-border rounded-lg p-8">
                <SettingSection title="Profile">
                    <FormRow label="Full Name">
                        <input type="text" defaultValue="Alex Doe" className="bg-dark-bg border border-dark-border rounded-md px-3 py-2 w-64 text-text-primary" />
                    </FormRow>
                    <FormRow label="Email Address">
                        <input type="email" defaultValue="alex.doe@example.com" className="bg-dark-bg border border-dark-border rounded-md px-3 py-2 w-64 text-text-primary" />
                    </FormRow>
                    <FormRow label="Password">
                        <button className="bg-accent-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-all">
                            Change Password
                        </button>
                    </FormRow>
                </SettingSection>

                <SettingSection title="Appearance">
                    <FormRow label="Theme">
                        <div className="flex space-x-2">
                            <button className="bg-accent-violet text-white font-bold py-2 px-4 rounded-lg">Dark Mode</button>
                            <button className="bg-dark-bg border border-dark-border text-text-secondary py-2 px-4 rounded-lg">Light Mode</button>
                            <button className="bg-dark-bg border border-dark-border text-text-secondary py-2 px-4 rounded-lg">System</button>
                        </div>
                    </FormRow>
                </SettingSection>

                <SettingSection title="Neuroadaptive Preferences">
                    <FormRow label="Enable Neuroadaptive Features">
                        <ToggleSwitch />
                    </FormRow>
                    <FormRow label="Intervention Sensitivity">
                        <div className="flex flex-col items-start text-sm text-text-secondary">
                            <label className="flex items-center"><input type="radio" name="sensitivity" className="mr-2" /> Low: Trigger only on strong 'drowsy' signals</label>
                            <label className="flex items-center"><input type="radio" name="sensitivity" className="mr-2" defaultChecked/> Medium: Balanced interventions</label>
                            <label className="flex items-center"><input type="radio" name="sensitivity" className="mr-2" /> High: Trigger on first sign of distraction</label>
                        </div>
                    </FormRow>
                     <FormRow label="Preferred Interventions">
                        <div className="flex flex-col items-start text-sm text-text-secondary">
                            <label className="flex items-center"><input type="checkbox" className="mr-2" defaultChecked/> Allow Text Tips (Mnemonics)</label>
                            <label className="flex items-center"><input type="checkbox" className="mr-2" defaultChecked/> Allow Visual Breaks (3D Models)</label>
                            <label className="flex items-center"><input type="checkbox" className="mr-2" disabled/> Allow Audio Cues (Coming Soon)</label>
                        </div>
                    </FormRow>
                </SettingSection>
            </div>
            <style>{`
                .toggle-checkbox:checked {
                    right: 0;
                    border-color: #8a2be2;
                }
                .toggle-checkbox:checked + .toggle-label {
                    background-color: #8a2be2;
                }
            `}</style>
        </div>
    );
};

export default SettingsPage;
