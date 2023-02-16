import { MISDEMEANOURS } from "../types/misdemeanours.types"

export const Confession : React.FC = () => {
    return (
        <div>
            <p>It's very difficult to catch people committing misdemeanours 
                so we appreciate it when citizens confess to us directly.</p>
            <p>However, if you're just having a hard day and need to vent then 
                you're welcome to contact us here too. Up to ypu!</p>
            <form action="">
                <label htmlFor="subject">Subject</label>
                <input name="subject" type="text" />
                <label htmlFor="reason">Reason for contact</label>
                <select name="reason" id="reason">
                <option value="">--Please select an option--</option>
                    {MISDEMEANOURS.map(m => <option value={m}>{m}</option>)}
                    <option value="I just want to talk">I just want to talk</option>
                </select>
                <textarea name="" id="" cols={30} rows={10}></textarea>
                <input type="submit" value="Confess" />
            </form>
        </div>
    )
}