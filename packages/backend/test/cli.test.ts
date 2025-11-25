import { describe, it, expect } from 'vitest';
import { generateCommand } from '../src/cli/dynamic-command-generator';

describe('Dynamic Command Generator', () => {
  it('should generate command with basic properties', () => {
    const config = {
      name: 'test',
      description: 'Test command'
    };
    
    const command = generateCommand(config);
    expect(command.name()).toBe('test');
  });

  it('should generate command with argument', () => {
    const config = {
      name: 'test',
      description: 'Test command',
      argument: {
        name: 'service',
        description: 'Service name'
      }
    };
    
    const command = generateCommand(config);
    expect(command.name()).toBe('test');
  });

  it('should generate command with options', () => {
    const config = {
      name: 'test',
      description: 'Test command',
      options: {
        lang: {
          short: '-l',
          long: '--lang',
          description: 'Language',
          defaultValue: 'en'
        }
      }
    };
    
    const command = generateCommand(config);
    expect(command.name()).toBe('test');
  });

  it('should generate command with required options', () => {
    const config = {
      name: 'test',
      description: 'Test command',
      requiredOptions: {
        user: {
          short: '-u',
          long: '--user <user>',
          description: 'User name'
        }
      }
    };
    
    const command = generateCommand(config);
    expect(command.name()).toBe('test');
  });

  it('should generate command with subcommands', () => {
    const config = {
      name: 'test',
      description: 'Test command',
      command: {
        start: {
          name: 'start',
          description: 'Start service',
          action: () => {}
        }
      }
    };
    
    const command = generateCommand(config);
    expect(command.name()).toBe('test');
  });
});