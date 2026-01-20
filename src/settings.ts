import {App, PluginSettingTab, Setting} from "obsidian";
import ZoteroTemplater from "./main";
import { FileSuggest } from "./FileSuggest";

export interface ZoteroTemplaterSettings {
	mySetting: string;
}

export const DEFAULT_SETTINGS: ZoteroTemplaterSettings = {
	templateFile: 'default'
}

export class SampleSettingTab extends PluginSettingTab {
	plugin: ZoteroTemplater;

	constructor(app: App, plugin: ZoteroTemplater) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Template File')
			.setDesc('What template are we filling?')
			.addText(text => {
				new FileSuggest(this.app, text.inputEl);

				text.setPlaceholder('Select the note to use as a template')
					.setValue(this.plugin.settings.mySetting)
					.onChange(async (value) => {
						this.plugin.settings.templateFile = value;
						await this.plugin.saveSettings();
					});
			});
	}
}
