import { useState } from "react"
import { useOutsideClick } from "../hooks/useOutsideClick";
import Checkbox from "../assets/checkbox-unchecked.svg"
import CheckboxChecked from "../assets/checkbox-checked.svg"

interface DropdownProps {
    title?: string | undefined;
    options: string[];
    selectedItems: Set<string>;
    multi: boolean;
    width: number;
    placeholder: string;
    onSelect: (selection:string) => void;
    onSelectMany?: (selections: string[]) => void;
    onRemove: (selection:string) => void;
    onClear: () => void;
}

interface DropdownOptionProps {
    title: string;
    onSelect: (selection:string) => void;
    onCloseDropdown: () => void;
}

interface MultiDropdownOptionProps {
    title: string;
    selectedItems: Set<string>;
    isSelectAll?: boolean | undefined;
    onSelect: (selection:string) => void;
    onRemove: (selection:string) => void;
}

const DropdownOption = (props:DropdownOptionProps) => {
    const { title, onSelect, onCloseDropdown } = props;
    const onClickOption = () => {
        onSelect(title);
        onCloseDropdown();
    }
    return (
        <li className="dropdown-option" onClick={onClickOption}> 
            {title}
        </li>
    )
}

const MultiDropdownOption = (props:MultiDropdownOptionProps) => {
    const { title, selectedItems, onSelect, onRemove } = props;
    const isSelected = () => selectedItems.has(title);
    const onClickOption = () => {
        if (!isSelected()) {
            onSelect(title);
            return;
        }
        onRemove(title);
    }

    return (
        <li className={`multi-dropdown-option ${isSelected() ? "option-selected" : ""}`} onClick={onClickOption}> 
            {isSelected() ? <img src={CheckboxChecked} /> : <img src={Checkbox} />}
            {title}
        </li>
    )
}

interface SelectAllProps {
    options: string[];
    selectedItems: Set<string>;
    onSelectMany?: (selections: string[]) => void | undefined;
    onClear: () => void;
}

const SelectAllDropdownOption = (props: SelectAllProps) => {
    const { options, selectedItems, onSelectMany, onClear} = props;

    if (onSelectMany === undefined) {
        return;
    }

    const onClickSelectAll = () => {
        if (selectedItems.size == options.length) {
            onClear();
            return;
        }
        onSelectMany(options);
    }

    return (
        <li onClick={onClickSelectAll} > 
            <div className="multi-dropdown-select-all">{selectedItems.size == options.length ? "Deselect all" : "Select all"}</div>
        </li>
    )
}


const Dropdown = (props:DropdownProps) => {
    const { title, options, selectedItems, multi, width, placeholder, onSelect, onSelectMany, onRemove, onClear } = props;
    const [show, setShow] = useState(false);
    const ref = useOutsideClick(() => {
        setShow(false);
    });
    const onToggleDropdown = () => setShow(!show);
    const onCloseDropdown = () => setShow(false);
    

    return (
        <div className={`dropdown`} style={{width: `${width}px`}}>

            <div className={`dropdown-display ${show ? "dropdown-display-selected" : ""}`}>
                <label className={`dropdown-display-label ${show ? "dropdown-display-label-selected" : ""}`}>{title}</label>
                {selectedItems.size <= 0 ?
                    <div className="dropdown-display-placeholder" onClick={onToggleDropdown}>{placeholder ? placeholder : "Placeholder..."}</div> : 
                    <div className="dropdown-display-text" onClick={onToggleDropdown}>{[...selectedItems].join(', ')}</div>
                }
                {selectedItems.size > 0 ? <div className="dropdown-display-clear" onClick={onClear}>x</div> : null}
            </div>

            <div className="dropdown-list" ref={ref}>
                {show && (multi ?
                    <ul> 
                        <SelectAllDropdownOption options={options} selectedItems={selectedItems} onSelectMany={onSelectMany} onClear={onClear}  />
                        {options.map(option => <MultiDropdownOption key={`option-${option}`} title={option} selectedItems={selectedItems} onSelect={onSelect} onRemove={onRemove} />)}
                    </ul> : 
                    <ul>{options.map(option => <DropdownOption key={`option-${option}`} title={option} onSelect={onSelect} onCloseDropdown={onCloseDropdown} />)}</ul>
                )}
            </div>

        </div>
    )
}

export default Dropdown;