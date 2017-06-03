import * as React from "react";

import {DataNexusService as IDataNexusService} from "./DataNexusService";

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class Hello extends React.Component<undefined, undefined> {
    async onClick(): Promise<void> {

        require.ensure(['./DataNexusService'], async (require: any) => {
            const { DataNexusService } : { DataNexusService: typeof IDataNexusService } = require('./DataNexusService');

            let data = await DataNexusService.getData('/index.html');
            alert(data.status);
        });

    }

    render() {
        return (
            <div>
                <h1>Hello!</h1>
                <button onClick={this.onClick}>Test</button>
            </div>
        );
    }
}
