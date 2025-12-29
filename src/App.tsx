import React, { useState, useCallback, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import {
  Stack,
  Dropdown,
  IDropdownOption,
  DefaultButton,
  MessageBar,
  MessageBarType,
  ThemeProvider,
  initializeIcons,
} from '@fluentui/react';
import { LayoutRenderer } from './components/Renderer';
import { presets, getPresetNames } from './presets';
import { parseConfig, configToJSX, validateConfig, copyToClipboard, stringifyConfig } from './utils/configUtils';
import { azureTheme } from './styles/theme';
import { PlaygroundConfig } from './types';

// Initialize Fluent UI icons
initializeIcons();

const App: React.FC = () => {
  const [editorValue, setEditorValue] = useState<string>('');
  const [config, setConfig] = useState<PlaygroundConfig | null>(null);
  const [error, setError] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [selectedPreset, setSelectedPreset] = useState<string>('vm-overview');

  // Load initial preset
  useEffect(() => {
    const preset = presets.find(p => p.id === selectedPreset);
    if (preset) {
      const jsonStr = stringifyConfig(preset.config);
      setEditorValue(jsonStr);
      setConfig(preset.config);
    }
  }, []);

  // Handle editor change with debounce
  const handleEditorChange = useCallback((value: string | undefined) => {
    if (!value) return;
    
    setEditorValue(value);
    
    // Parse and validate
    const parsed = parseConfig(value);
    if (parsed) {
      const validation = validateConfig(parsed);
      if (validation.valid) {
        setConfig(parsed);
        setError('');
      } else {
        setError(`Validation errors: ${validation.errors.join(', ')}`);
        setConfig(null);
      }
    } else {
      setError('Invalid JSON/YAML format');
      setConfig(null);
    }
  }, []);

  // Handle preset change
  const handlePresetChange = (_: any, option?: IDropdownOption) => {
    if (!option) return;
    
    setSelectedPreset(option.key as string);
    const preset = presets.find(p => p.id === option.key);
    if (preset) {
      const jsonStr = stringifyConfig(preset.config);
      setEditorValue(jsonStr);
      setConfig(preset.config);
      setError('');
      setSuccessMessage(`Loaded preset: ${preset.name}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  // Export JSX to clipboard
  const handleExportJSX = async () => {
    if (!config) {
      setError('No valid configuration to export');
      return;
    }
    
    const jsx = configToJSX(config);
    const success = await copyToClipboard(jsx);
    
    if (success) {
      setSuccessMessage('JSX copied to clipboard!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setError('Failed to copy to clipboard');
    }
  };

  // Export JSON to clipboard
  const handleExportJSON = async () => {
    if (!config) {
      setError('No valid configuration to export');
      return;
    }
    
    const success = await copyToClipboard(editorValue);
    
    if (success) {
      setSuccessMessage('JSON copied to clipboard!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setError('Failed to copy to clipboard');
    }
  };

  return (
    <ThemeProvider theme={azureTheme}>
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Stack
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
          style={{
            padding: '12px 24px',
            backgroundColor: azureTheme.palette.themePrimary,
            color: azureTheme.palette.white,
          }}
        >
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }}>
            <span style={{ fontSize: '20px', fontWeight: 600 }}>⚡</span>
            <span style={{ fontSize: '18px', fontWeight: 600 }}>
              Azure Portal UI Playground
            </span>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 8 }}>
            <DefaultButton
              text="Export JSX"
              onClick={handleExportJSX}
              styles={{
                root: { backgroundColor: 'white' },
              }}
            />
            <DefaultButton
              text="Export JSON"
              onClick={handleExportJSON}
              styles={{
                root: { backgroundColor: 'white' },
              }}
            />
          </Stack>
        </Stack>

        {/* Toolbar */}
        <Stack
          horizontal
          verticalAlign="center"
          tokens={{ childrenGap: 16 }}
          style={{
            padding: '12px 24px',
            borderBottom: `1px solid ${azureTheme.palette.neutralLight}`,
            backgroundColor: azureTheme.palette.white,
          }}
        >
          <Dropdown
            label="Load Preset:"
            selectedKey={selectedPreset}
            options={getPresetNames()}
            onChange={handlePresetChange}
            styles={{ root: { width: 250 } }}
          />
        </Stack>

        {/* Messages */}
        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => setError('')}
            dismissButtonAriaLabel="Close"
          >
            {error}
          </MessageBar>
        )}
        {successMessage && (
          <MessageBar
            messageBarType={MessageBarType.success}
            onDismiss={() => setSuccessMessage('')}
            dismissButtonAriaLabel="Close"
          >
            {successMessage}
          </MessageBar>
        )}

        {/* Main Content: Split Pane */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Editor Pane */}
          <div
            style={{
              width: '50%',
              borderRight: `1px solid ${azureTheme.palette.neutralLight}`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: azureTheme.palette.neutralLighter,
                borderBottom: `1px solid ${azureTheme.palette.neutralLight}`,
                fontWeight: 600,
              }}
            >
              Configuration Editor (JSON/YAML)
            </div>
            <div style={{ flex: 1 }}>
              <Editor
                height="100%"
                defaultLanguage="json"
                value={editorValue}
                onChange={handleEditorChange}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  automaticLayout: true,
                }}
              />
            </div>
          </div>

          {/* Preview Pane */}
          <div
            style={{
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: azureTheme.palette.neutralLighterAlt,
            }}
          >
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: azureTheme.palette.neutralLighter,
                borderBottom: `1px solid ${azureTheme.palette.neutralLight}`,
                fontWeight: 600,
              }}
            >
              Live Preview
            </div>
            <div style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
              {config ? (
                <LayoutRenderer
                  config={config.layout.components}
                  layoutType={config.layout.type}
                />
              ) : (
                <div style={{ textAlign: 'center', color: azureTheme.palette.neutralSecondary, padding: '48px' }}>
                  {error ? '⚠️ Invalid configuration' : 'Enter a valid configuration to see preview'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;
